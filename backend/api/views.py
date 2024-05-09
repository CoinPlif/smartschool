from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from api import serializers
from food.models import Dishes, Orders


class DishesViewSet(viewsets.ModelViewSet):
    queryset = Dishes.objects.all()
    serializer_class = serializers.DishesSerializers


class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = serializers.OrdersSerializers
