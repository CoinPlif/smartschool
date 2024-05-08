from django.contrib import admin

from .models import Orders, Dishes, DishesInOrders, Reviews, DishTypes

admin.site.register(Orders)
admin.site.register(Dishes)
admin.site.register(DishTypes)
admin.site.register(Reviews)
admin.site.register(DishesInOrders)

