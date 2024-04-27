from django.contrib import admin

from .models import Orders, Dishes, DishesInOrders

admin.site.register(Orders)
admin.site.register(Dishes)
admin.site.register(DishesInOrders)
