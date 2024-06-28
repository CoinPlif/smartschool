from django.urls import path, include
from rest_framework.routers import SimpleRouter
from users.views import SchoolWorkersViewSet, ParentsViewSet, ChildrenViewSet
from api import views

router = SimpleRouter()

router.register('dishes', views.DishesViewSet)
router.register('orders', views.OrdersViewSet)
router.register('checks', views.ChecksViewSet)
router.register('brdishes', views.BrDishesViewSet)
router.register('lundishes', views.LunDishesViewSet)
router.register('dindishes', views.DinDishesViewSet)
router.register('types', views.DishTypesViewSet)
router.register('schoolworkers', SchoolWorkersViewSet)
router.register('parents', ParentsViewSet)
router.register('children', ChildrenViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls.authtoken'))
]