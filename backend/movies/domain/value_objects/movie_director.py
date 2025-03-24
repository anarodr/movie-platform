class MovieDirector:

    # Only call it for testing purpose to set invalid values
    def __init__(self, value: str):
        self.value = value

    @classmethod
    def create(cls, value: str):
        if not isinstance(value, str):
            raise ValueError("The value should be a string")
        if len(value) < 1 or len(value) > 100:
            raise ValueError(
                "Lenght of the string must be between 1 and 100 characters"
            )
        return cls(value)

    def __str__(self):
        return str(self.value)

    def dict(self):
        return self.value
