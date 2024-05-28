from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from users.models import SchoolWorkers, Parents
from users import serializers


class SchoolWorkersViewSet(viewsets.ModelViewSet):
    queryset = SchoolWorkers.objects.all()
    serializer_class = serializers.SchoolWorkersSerializers
    http_method_names = ['get']


class ParentsViewSet(viewsets.ModelViewSet):
    queryset = Parents.objects.all()
    serializer_class = serializers.ParentsSerializers

    def list(self, request):
        queryset = Parents.objects.all()
        serializer = serializers.ParentsSerializers(queryset, many=True)
        paraent_data = serializer.data[0]
        parents_login = paraent_data["parents_login"]
        parents_password = paraent_data["parents_password"]
        author = get_object_or_404(Parents, parents_password=parents_password, parents_login=parents_login)
        print(author)
        return Response(serializer.data)

    # # @action(
    # #     detail=True,
    # #     methods=('GET',)
    # # )
    # def get(self, request):
    #     queryset = Parents.objects.all()
    #     # return Response(f"{request.data}")
    #     # parents_login = request.data["parents_login"]
    #     # parents_password = request.data["parents_password"]
    #     # print(f"{parents_login} -------------------------------------------------------------------------------")
    #     return Response(f"{queryset}")

