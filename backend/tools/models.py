from django.db import models

from food.models import Orders
from users.constants import LOGIN_LENGTH
from users.models import Parents, Cards, Administrators


class Payments(models.Model):
    order_id = models.ForeignKey(Orders,
                                 on_delete=models.CASCADE,
                                 verbose_name="id заказа, к которому проиведен платеж")

    parents_id = models.ForeignKey(Parents,
                                   on_delete=models.CASCADE,
                                   verbose_name="id родителя, который оплачивал")

    cards_id = models.ForeignKey(Cards,
                                 on_delete=models.CASCADE,
                                 verbose_name="id карты, по которой проводилась оплата")

    class Meta:
        verbose_name = "Платежи"

    def __str__(self):
        return f"{self.order_id} {self.parents_id} {self.cards_id}"


class Reports(models.Model):
    reports_description = models.TextField(max_length=255,
                                           verbose_name="id заказа, к которому проиведен платеж")

    parents_id = models.ForeignKey(Parents,
                                   on_delete=models.CASCADE,
                                   verbose_name="id родителя, который оплачивал")

    reports_created_dttm = models.DateTimeField(verbose_name="Дата создания репорта (datatime)")

    administrators_id = models.ForeignKey(Administrators,
                                          on_delete=models.CASCADE,
                                          verbose_name="id администратора, который посмотрел репорт")

    class Meta:
        verbose_name = "Репорты"

    def __str__(self):
        return f"{self.parents_id} {self.reports_created_dttm}"

