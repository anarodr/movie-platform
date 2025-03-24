class ResourceNotFoundException(Exception):
    def __init__(self, id: str):
        self.id = id
        self.errors = {"detail": f"Movie with ID {id} not found"}
        super().__init__(self.errors["detail"])

    def __str__(self):
        return self.errors["detail"]
