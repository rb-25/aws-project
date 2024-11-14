import contextlib

from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "to_do_list.users"
    verbose_name = _("Users")

    def ready(self):
        with contextlib.suppress(ImportError):
            import to_do_list.users.signals  # noqa: F401
