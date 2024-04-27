from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from .constants import LENGTH


class Dishtype(models.Model):
    dishtype_name = models.CharField(max_length=LENGTH, verbose_name="Прием пищи")

    class Meta:
        verbose_name = "Dishtype"

    def __str__(self):
        return self.dishtype_name


class Dishes(models.Model):
    dish_type = models.CharField(max_length=255, verbose_name="Тип блюда"),
    dish_name = models.CharField(max_length=255, verbose_name="Название блюда"),
    dish_description = models.TextField(max_length=255, verbose_name="Описание блюда"),
    dish_calories = models.FloatField( verbose_name="Калорийность блюда"),
    dish_price = models.FloatField( verbose_name="Цена блюда"),
    valid_from_dttm = models.DateTimeField(verbose_name="Дата начала нахождения блюда в меню (datatime)")
    valid_to_dttm = models.DateTimeField(verbose_name="Дата конца нахождения блюда в меню (datatime)")
    SchoolWorkers_id = models.IntegerField(verbose_name="id сотрудника, который выставил блюдо")

    class Meta:
        verbose_name = "Блюда"

    def __str__(self):
        return self.dish_name


class Orders(models.Model):
    orders_dishes = models.ManyToManyField(Dishes, through="DishesInOrders", verbose_name="Список блюд"),
    children_id = models.IntegerField(verbose_name="id ребенка, на которого заказано блюдо")
    orders_created_dttm = models.DateTimeField(verbose_name="Дата создания заказа (datatime)")
    orders_day_dt = models.DateField(verbose_name="Дата создания заказа (data)")
    orders_if_paid = models.BooleanField(verbose_name="флаг, оплачен или нет")
    orders_payment_amount = models.FloatField(verbose_name="Стоимость заказа (вычислимое поля)")

    class Meta:
        verbose_name = "Orders"


class DishesInOrders(models.Model):
    dish_id = models.ForeignKey(Dishes, on_delete=models.CASCADE)
    order_id = models.ForeignKey(Orders, on_delete=models.CASCADE)

    def __str__(self):
        return f"dish_id = {self.dish_id} oreder_id {self.order_id}"


class Reviews(models.Model):
    reviews_mark = models.IntegerField(verbose_name="Оценка отзыва")
    reviews_text = models.TextField(verbose_name="Текст отзыва")
    #parent_id = models.IntegerField(verbose_name="Оценка отзыва")
    dishes_id = models.IntegerField(verbose_name="id блюда")
    reviews_created_dttm = models.DateTimeField(verbose_name="Дата создания отзыва")

    class Meta:
        verbose_name = "Reviews"



