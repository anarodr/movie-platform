export const createActionNames = (actionName: string) => ({
    name: `$${actionName}`,
    pending: `${actionName}/pending`,
    fulfilled: `${actionName}/fulfilled`,
    rejected: `${actionName}/rejected`,
})
