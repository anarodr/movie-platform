class ResourceAlreadyCreatedException(Exception):
    def __init__(self, id: str):
        self.id = id
        self.errors = {"detail": f"Movie with ID {id} is already created"}
        super().__init__(self.errors["detail"])

    def __str__(self):
        return self.errors["detail"]
