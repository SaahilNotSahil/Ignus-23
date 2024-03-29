from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/sponsors/', include('sponsors.urls')),
    path('api/core-team/', include('team.urls')),
    path('api/accounts/', include('registration.urls')),
    path('api/igmun/', include('igmun.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/events/', include('events.urls')),
    re_path(r'^ckeditor/', include('ckeditor_uploader.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
