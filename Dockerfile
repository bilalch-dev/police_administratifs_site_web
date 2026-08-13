# ==========================================================================
# FRONTEND DOCKERFILE - Police Administrative Web Portal
# Base Image: Nginx Alpine (Lightweight & High-Performance)
# ==========================================================================

FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static website assets into Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY legal.html /usr/share/nginx/html/
COPY domains.html /usr/share/nginx/html/
COPY procedures.html /usr/share/nginx/html/
COPY complaints.html /usr/share/nginx/html/
COPY resources.html /usr/share/nginx/html/
COPY admin.html /usr/share/nginx/html/
COPY Guide_police_administrative.pdf /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# Expose HTTP port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
