from django.shortcuts import render

# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.response import Response

from api import serializers
from food.models import Dishes, Orders, Checks, BrDishes, LunDishes, DinDishes


class DishesViewSet(viewsets.ModelViewSet):
    queryset = Dishes.objects.all()
    serializer_class = serializers.DishesSerializers

    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("dishes_type",)


class BrDishesViewSet(viewsets.ModelViewSet):
    queryset = BrDishes.objects.all()
    serializer_class = serializers.BrDishesSerializers


class LunDishesViewSet(viewsets.ModelViewSet):
    queryset = LunDishes.objects.all()
    serializer_class = serializers.LunDishesSerializers


class DinDishesViewSet(viewsets.ModelViewSet):
    queryset = DinDishes.objects.all()
    serializer_class = serializers.DinDishesSerializers


class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = serializers.OrdersSerializers


class ChecksViewSet(viewsets.ModelViewSet):
    queryset = Checks.objects.all()
    serializer_class = serializers.ChecksSerializers
