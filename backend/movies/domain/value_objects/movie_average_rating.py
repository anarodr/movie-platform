class MovieAverageRating:

    # Only call it for testing purpose to set invalid values
    def __init__(self, value: int):
        self.value = value

    @classmethod
    def create(cls, value: int):
        if not isinstance(value, int):
            raise ValueError("The value must be an integer")
        if value < 1 or value > 5:
            raise ValueError("The rating must be between 1 and 5")
        return cls(value)

    def to_int(self) -> int:
        return self.value

    def __str__(self):
        return str(self.value)

    def dict(self):
        return self.value
