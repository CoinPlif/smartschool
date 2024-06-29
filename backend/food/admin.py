from django.contrib import admin

from .models import Orders, Dishes, Reviews, DishTypes, Checks, BrDishes, LunDishes, DinDishes

admin.site.register(Orders)
admin.site.register(Dishes)
admin.site.register(DishTypes)
admin.site.register(Reviews)
admin.site.register(BrDishes)
admin.site.register(LunDishes)
admin.site.register(DinDishes)
admin.site.register(Checks)
