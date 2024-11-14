from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

app_name = "todo"

router = DefaultRouter()
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = [
    path('', include(router.urls)),
]
