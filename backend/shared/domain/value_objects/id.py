from uuid import UUID


class ID:

    # Only call it for testing purpose to set invalid values
    def __init__(self, value: str):
        self.value = value

    @classmethod
    def create(cls, value: str):
        try:
            UUID(value)
        except ValueError:
            raise ValueError(f"Invalid UUID: {value}")
        return cls(value)

    def __str__(self):
        return str(self.value)

    def dict(self):
        return str(self.value)
