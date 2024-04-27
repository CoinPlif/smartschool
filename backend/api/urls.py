from django.urls import path, include
from rest_framework.routers import SimpleRouter

from api import views

router = SimpleRouter()

router.register('dishes', views.DishesViewSet)
router.register('orders', views.OrdersViewSet)


urlpatterns = [
    path('', include(router.urls))
]