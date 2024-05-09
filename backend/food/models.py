from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from .constants import LENGTH
from users.models import (SchoolWorkers, Parents, Children)


class DishTypes(models.Model):
    dishtypes_name = models.CharField(max_length=LENGTH,
                                      verbose_name="Прием пищи")

    class Meta:
        verbose_name = "Тип блюда, когда он принимается (завтрак, обед или ужин)"

    def __str__(self):
        return self.dishtypes_name


class Dishes(models.Model):
    dish_type = models.ForeignKey(DishTypes,
                                  on_delete=models.CASCADE,
                                  verbose_name="Тип блюда (завтрак, обед или ужин)")
    dish_name = models.CharField(max_length=255,
                                 verbose_name="Название блюда")
    dish_description = models.TextField(max_length=255,
                                        verbose_name="Описание блюда")
    dish_calories = models.FloatField(verbose_name="Калорийность блюда")
    dish_price = models.FloatField(verbose_name="Цена блюда")
    valid_from_dttm = models.DateTimeField(verbose_name="Дата начала нахождения блюда в меню (datatime)")
    valid_to_dttm = models.DateTimeField(verbose_name="Дата конца нахождения блюда в меню (datatime)")
    SchoolWorkers_id = models.ForeignKey(SchoolWorkers,
                                         on_delete=models.CASCADE,
                                         verbose_name="id работника учреждения, который выставил блюдо")

    class Meta:
        verbose_name = "Блюда"

    def __str__(self):
        return self.dish_name


class Orders(models.Model):
    orders_dishes = models.ManyToManyField(Dishes,
                                           through="DishesInOrders",
                                           verbose_name="Список блюд"),
    children_id = models.ForeignKey(Children,
                                    on_delete=models.CASCADE,
                                    verbose_name="id ребенка, на которого заказано блюдо")
    orders_created_dttm = models.DateTimeField(verbose_name="Дата создания заказа (datatime)")
    orders_day_dt = models.DateField(verbose_name="Дата, на которую создан заказ")
    orders_if_paid = models.BooleanField(verbose_name="Флаг, оплачен или нет")
    orders_payment_amount = models.FloatField(verbose_name="Стоимость заказа (вычислимое поля)")

    class Meta:
        verbose_name = "Orders"

    def __str__(self):
        return f"orders_day_dt = {self.orders_day_dt} children_id = {self.children_id}"


class DishesInOrders(models.Model):
    dish_id = models.ForeignKey(Dishes,
                                on_delete=models.CASCADE)
    order_id = models.ForeignKey(Orders,
                                 on_delete=models.CASCADE)

    def __str__(self):
        return f"dish_id = {self.dish_id} order_id = {self.order_id}"


class Reviews(models.Model):
    reviews_mark = models.IntegerField(verbose_name="Оценка отзыва")
    reviews_text = models.TextField(verbose_name="Текст отзыва")
    parent_id = models.ForeignKey(Parents,
                                  on_delete=models.CASCADE,
                                  verbose_name="Оценка отзыва")
    dishes_id = models.IntegerField(verbose_name="id блюда")
    reviews_created_dttm = models.DateTimeField(verbose_name="Дата создания отзыва")

    class Meta:
        verbose_name = "Reviews"

    def __str__(self):
        return f"parent_id = {self.parent_id} dishes_id = {self.dishes_id}"
