import sys
import io
import requests
import json
import time

# Ensure UTF-8 stdout on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_URL = "http://localhost:5000"

# 10 diverse, realistic Arabic complaints
complaints_data = [
    {
        "category": "النظافة والبيئة",
        "name": "كريم التازي",
        "phone": "0661122334",
        "title": "تراكم النفايات المنزلية ومخلفات البناء بالشارع العام",
        "location": "حي بيت غلام، زنقة فاس، تازة السفلى",
        "details": "تراكم كبير للأزبال ومخلفات الهدم والبناء في زاوية الشارع مما يعرقل حركة الراجلين ويشكل خطراً بيئياً وتنبعث منه روائح كريهة.",
        "target_step": 1,
        "notes": "تم تسجيل الشكاية وتوجيهها لمصلحة النظافة للتدخل الميداني."
    },
    {
        "category": "السير والجولان",
        "name": "فاطمة الزهراء الإدريسي",
        "phone": "0662334455",
        "title": "احتلال الملك العمومي وعرقلة حركة المرور بشارع تجاري",
        "location": "شارع محمد السادس، قرب السوق المركزي، تازة",
        "details": "قيام أصحاب محلات تجارية ومقاهي بوضع حواجز حديدية وطاولات فوق الرصيف المخصص للراجلين مما يجبر المواطنين على المشي في قارعة الطريق.",
        "target_step": 2,
        "notes": "تمت إحالة الشكاية على فرقة المراقبة الميدانية للمعاينة وإعداد تقرير المخالفة."
    },
    {
        "category": "الكلاب الضالة والحيوانات",
        "name": "عمر بنجلون",
        "phone": "0663445566",
        "title": "انتشار قطيع من الكلاب الضالة بالقرب من مدرسة ابتدائية",
        "location": "حي الكعدة، قرب الثانوية التأهيلية علي بن بري، تازة",
        "details": "تواجد أزيد من 8 كلاب ضالة تتجول يومياً حول المؤسسة التعليمية مما يهدد سلامة الأطفال والمواطنين صباحاً ومساءً.",
        "target_step": 3,
        "notes": "تدخل فرقة المكتب الجماعي لحفظ الصحة بالتنسيق مع مصلحة الوقاية لحجز الكلاب الضالة."
    },
    {
        "category": "السكينة العامة والإزعاج",
        "name": "سعاد الفاسي",
        "phone": "0664556677",
        "title": "إزعاج ليلي وضوضاء مستمرة صادرة عن ورشة غير مرخصة",
        "location": "حي الأندلس، زنقة الزيتون، تازة",
        "details": "ورشة حدادة تواصل العمل واستخدام الآلات والمعدات الثقيلة في أوقات متأخرة من الليل (بعد الحادية عشر ليلاً) مما يقض مضجع الساكنة.",
        "target_step": 4,
        "notes": "تمت المعالجة: توجيه إنذار رسمي للمخالف وإلزامه باحترام أوقات العمل القانونية وتوقيف الأنشطة المزعجة ليلاً."
    },
    {
        "category": "المؤسسات المرتبة والصحية",
        "name": "يوسف المرابط",
        "phone": "0665667788",
        "title": "محل لبيع الوجبات السريعة لا يحترم الشروط الصحية والنظافة",
        "location": "حي ورياغل، شارع مولاي يوسف، تازة",
        "details": "انبعاث روائح دهون غير مطابقة وغياب الشروط الأساسية لتخزين اللحوم والمواد الاستهلاكية مما يهدد الصحة العامة للمستهلكين.",
        "target_step": 2,
        "notes": "برمجة زيارة تفتيشية من طرف أطباء المكتب الجماعي لحفظ الصحة (BMH) لأخذ العينات ومراقبة التراخيص."
    },
    {
        "category": "النظافة والبيئة",
        "name": "رشيد العماري",
        "phone": "0666778899",
        "title": "تسرب مياه الصرف الصحي وفيضان بالشارع العام",
        "location": "حي المسيرة 2، قرب الملحقة الإدارية الرابعة، تازة",
        "details": "انكسار في قناة التطهير السائل بالشارع أدى إلى فيضان مياه عادمة وتجمع الحشرات بالقرب من التجمعات السكنية.",
        "target_step": 3,
        "notes": "إخطار شركة التدبير المفوض وجماعة تازة، والأشغال جارية لإصلاح العطب وشفط المياه."
    },
    {
        "category": "السير والجولان",
        "name": "حنان العلمي",
        "phone": "0667889900",
        "title": "وضع لوحات إشهارية غير مرخصة تحجب الرؤية في مدار طرقي",
        "location": "مدار حي القدس، تقاطع شارع علال بن عبد الله، تازة",
        "details": "تثبيت لوحات إعلانية كبيرة فوق الرصيف تحجب رؤية السائقين في الملتقى الطرقي مما تسبب في عدة حوادث سير خفيفة.",
        "target_step": 4,
        "notes": "تم التدخل من طرف عناصر الشرطة الإدارية وإزالة اللوحات الإشهارية المخالفة وإخلاء الملك العام."
    },
    {
        "category": "الكلاب الضالة والحيوانات",
        "name": "حمزة الصنهاجي",
        "phone": "0668990011",
        "title": "رعي عشوائي للأغنام والدواب داخل المساحات الخضراء والحدائق العمومية",
        "location": "حديقة 3 مارس، قرب المحطة الطرقية، تازة",
        "details": "إدخال قطعان الماشية للرعي في الحدائق المجهزة والمساحات الخضراء التابعة للجماعة مما يتسبب في إتلاف المغروسات وتلويث الفضاء.",
        "target_step": 1,
        "notes": "تسجيل الشكاية وتوجيه دورية مراقبة للموقع لضبط المخالفين وتحرير محاضر بحقهم."
    },
    {
        "category": "السكينة العامة والإزعاج",
        "name": "أمينة بوزيد",
        "phone": "0669001122",
        "title": "استعمال مكبرات الصوت بشكل عشوائي ومفرط في ساحة عمومية",
        "location": "ساحة أحراش، المركز التجاري، تازة",
        "details": "باعة متجولون يستعملون مكبرات صوت طيلة اليوم لترويج بضائعهم مما يخلق تشويشاً مستمراً على المرضى والطلبة في الحي السكني.",
        "target_step": 2,
        "notes": "إدراج الموقع ضمن جولات المراقبة اليومية لتحرير الرصيف والحد من التلوث السمعي."
    },
    {
        "category": "المؤسسات المرتبة والصحية",
        "name": "خالد الشريف",
        "phone": "0670112233",
        "title": "مستودع لتخزين المواد القابلة للاشتعال داخل بناية سكنية",
        "location": "حي حجرة كحيلة، المدخل الصناعي، تازة العليا",
        "details": "استغلال قبو عمارة سكنية في تخزين براميل طلاء ومواد كيميائية قابلة للاشتعال دون ترخيص إداري ودون احترام معايير السلامة من الحرائق.",
        "target_step": 3,
        "notes": "توجيه إشعار عاجل للجنة الإقليمية المختلطة ولجنة الوقاية المدنية للمعاينة الفورية واتخاذ إجراءات الإغلاق التحفظي."
    }
]

def main():
    print(f"[*] Connecting to API at {BASE_URL}...")
    
    # 1. Login as admin to get JWT token for status updates
    login_url = f"{BASE_URL}/api/auth/login"
    login_payload = json.dumps({"username": "admin", "password": "admin123"}).encode('utf-8')
    headers_auth = {"Content-Type": "application/json; charset=utf-8"}
    
    try:
        res = requests.post(login_url, data=login_payload, headers=headers_auth, timeout=5)
        if res.status_code == 200:
            token = res.json().get("token")
            headers_auth["Authorization"] = f"Bearer {token}"
            print("[+] Admin login successful! JWT Token acquired.")
        else:
            print(f"[!] Admin login returned {res.status_code}: {res.text}")
    except Exception as e:
        print(f"[!] Warning: Could not log in as admin: {e}")

    # 2. Push each complaint via POST /api/complaints
    created_complaints = []
    
    for idx, item in enumerate(complaints_data, start=1):
        payload_dict = {
            "name": item["name"],
            "phone": item["phone"],
            "category": item["category"],
            "title": item["title"],
            "location": item["location"],
            "details": item["details"]
        }
        payload_bytes = json.dumps(payload_dict, ensure_ascii=False).encode('utf-8')
        
        post_url = f"{BASE_URL}/api/complaints"
        headers_post = {"Content-Type": "application/json; charset=utf-8"}
        
        try:
            resp = requests.post(post_url, data=payload_bytes, headers=headers_post, timeout=5)
            if resp.status_code == 201:
                complaint = resp.json().get("complaint", {})
                tracking_id = complaint.get("id")
                print(f"[+] [{idx}/10] Created: {tracking_id} | {item['title']}")
                
                # If target_step > 1 and we have auth headers, update via PUT /api/admin/complaints/<id>
                if item["target_step"] > 1 and "Authorization" in headers_auth and tracking_id:
                    put_url = f"{BASE_URL}/api/admin/complaints/{tracking_id}"
                    update_dict = {
                        "statusStep": item["target_step"],
                        "notes": item["notes"]
                    }
                    update_bytes = json.dumps(update_dict, ensure_ascii=False).encode('utf-8')
                    put_resp = requests.put(put_url, data=update_bytes, headers=headers_auth, timeout=5)
                    if put_resp.status_code == 200:
                        print(f"    ↳ Updated status to Step {item['target_step']}")
                    else:
                        print(f"    ↳ Status update failed: {put_resp.status_code}")
                
                created_complaints.append(complaint)
            else:
                print(f"[-] [{idx}/10] Failed: {resp.status_code} - {resp.text}")
        except Exception as err:
            print(f"[-] [{idx}/10] Error submitting complaint: {err}")
            
        time.sleep(0.1)

    print("\n" + "="*60)
    print(f"[*] Summary: Successfully pushed {len(created_complaints)} complaints via REST API.")
    print("="*60)

if __name__ == "__main__":
    main()
