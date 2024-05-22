from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework import serializers
from users.models import SchoolWorkers, Parents


class SchoolWorkersViewSet(viewsets.ModelViewSet):
    queryset = SchoolWorkers.objects.all()
    #serializer_class = serializers.SchoolWorkersSerializers


class ParentsViewSet(viewsets.ModelViewSet):
    queryset = Parents.objects.all()
    #serializer_class = serializers.ParentsSerializers
