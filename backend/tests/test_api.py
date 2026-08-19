import re

# ==============================================================================
# 1. Health Check Endpoint Tests
# ==============================================================================


def test_health_check(client):
    """Test /api/health endpoint returns 200 OK and healthy status."""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'
    assert 'service' in data


# ==============================================================================
# 2. Citizen Complaint Submission & Tracking Tests
# ==============================================================================

def test_create_complaint_success(client):
    """Test citizen can submit a valid complaint and receive unique tracking ID."""
    payload = {
        "name": "كريم العلوي",
        "phone": "0661998877",
        "category": "النظافة والبيئة",
        "title": "تراكم النفايات بالشارع العام",
        "location": "حي الأمل - زنقة 14",
        "details": "وجود أكياس نفايات متراكمة تسبب روائح كريهة قرب المخبزة."
    }
    response = client.post('/api/complaints', json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert "complaint" in data
    complaint = data["complaint"]
    assert complaint["name"] == payload["name"]
    assert complaint["category"] == payload["category"]
    assert complaint["statusStep"] == 1
    # Tracking ID format must match POL-2026-XXXXX
    assert re.match(r"^POL-2026-[A-Z0-9]{5}$", complaint["id"])


def test_create_complaint_missing_fields_returns_400(client):
    """Test complaint submission fails with 400 when required fields are missing."""
    incomplete_payload = {
        "name": "طارق المنصوري",
        "phone": "0661000000"
        # missing category, title, location, details
    }
    response = client.post('/api/complaints', json=incomplete_payload)
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data


def test_get_complaint_by_tracking_id_success(client):
    """Test citizen can look up their complaint using the tracking code."""
    # First create a complaint
    post_res = client.post('/api/complaints', json={
        "name": "فاطمة الزهراء",
        "phone": "0662334455",
        "category": "السير والجولان",
        "title": "احتلال الرصيف بسيارات مهملة",
        "location": "شارع محمد الخامس",
        "details": "عربات مهملة تعرقل مرور الراجلين."
    })
    tracking_id = post_res.get_json()['complaint']['id']

    # Look up by ID
    get_res = client.get(f'/api/complaints/{tracking_id}')
    assert get_res.status_code == 200
    data = get_res.get_json()
    assert data['complaint']['id'] == tracking_id
    assert data['complaint']['name'] == "فاطمة الزهراء"
    assert data['complaint']['statusStep'] == 1


def test_get_complaint_not_found_returns_404(client):
    """Test looking up a non-existent tracking code returns 404."""
    response = client.get('/api/complaints/POL-2026-INVALID')
    assert response.status_code == 404
    data = response.get_json()
    assert "error" in data


# ==============================================================================
# 3. Authentication & JWT Security Tests
# ==============================================================================

def test_admin_login_success(client):
    """Test municipal officer can login and receive a valid JWT access token."""
    response = client.post('/api/auth/login', json={
        "username": "admin",
        "password": "admin123"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "token" in data
    assert data["user"]["username"] == "admin"
    assert data["user"]["role"] == "ADMIN"


def test_admin_login_invalid_password_returns_401(client):
    """Test login with wrong password returns 401 Unauthorized."""
    response = client.post('/api/auth/login', json={
        "username": "admin",
        "password": "wrong_password"
    })
    assert response.status_code == 401
    data = response.get_json()
    assert "error" in data


def test_admin_login_missing_fields_returns_400(client):
    """Test login without username or password returns 400 Bad Request."""
    response = client.post('/api/auth/login', json={"username": "admin"})
    assert response.status_code == 400


# ==============================================================================
# 4. Admin Protected Dashboard & Status Update Tests
# ==============================================================================

def test_get_all_complaints_without_jwt_returns_401(client):
    """Test accessing admin complaints without JWT token is blocked."""
    response = client.get('/api/admin/complaints')
    assert response.status_code == 401


def test_get_all_complaints_with_jwt_success(client, auth_headers):
    """Test authenticated officer can retrieve the list of complaints."""
    response = client.get('/api/admin/complaints', headers=auth_headers)
    assert response.status_code == 200
    data = response.get_json()
    assert "complaints" in data
    assert isinstance(data["complaints"], list)


def test_update_complaint_status_step_and_notes(client, auth_headers):
    """Test officer can advance complaint status step (1 to 4) and add notes."""
    # Create a test complaint
    post_res = client.post('/api/complaints', json={
        "name": "يوسف بن جلون",
        "phone": "0663112233",
        "category": "الكلاب الضالة والحيوانات",
        "title": "تجمع كلاب ضالة قرب الحديقة",
        "location": "حي النخيل",
        "details": "مجموعة من الكلاب الشاردة تشكل خطراً على الأطفال."
    })
    tracking_id = post_res.get_json()['complaint']['id']

    # Update to Step 2 (Inspection) with official notes
    update_payload = {
        "statusStep": 2,
        "notes": "تم توجيه فرقة حفظ الصحة لمعاينة المكان وتجميع الكلاب بالمحجز الجماعي."
    }
    put_res = client.put(
        f'/api/admin/complaints/{tracking_id}',
        json=update_payload,
        headers=auth_headers
    )
    assert put_res.status_code == 200
    data = put_res.get_json()
    assert data["complaint"]["statusStep"] == 2
    assert data["complaint"]["notes"] == update_payload["notes"]

    # Verify update persisted via citizen GET endpoint
    get_res = client.get(f'/api/complaints/{tracking_id}')
    assert get_res.get_json()["complaint"]["statusStep"] == 2


def test_update_complaint_not_found_returns_404(client, auth_headers):
    """Test updating a non-existent complaint returns 404."""
    response = client.put(
        '/api/admin/complaints/POL-2026-NONEXISTENT',
        json={"statusStep": 3},
        headers=auth_headers
    )
    assert response.status_code == 404
