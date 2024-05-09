from django.urls import path, include
from rest_framework.routers import SimpleRouter
from users.views import SchoolWorkersViewSet, ParentsViewSet
from api import views

router = SimpleRouter()

router.register('dishes', views.DishesViewSet)
router.register('orders', views.OrdersViewSet)
router.register('schoolworkers', SchoolWorkersViewSet)
router.register('parents', ParentsViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls.authtoken'))
]