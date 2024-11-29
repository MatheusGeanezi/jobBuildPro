import buildSchema from '../schema/builds'

export const listBuildsService = async (page: number, limit: number) => {
  const aggregate = buildSchema.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'employees',
        foreignField: '_id',
        as: 'employeesDetails',
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        budget: 1,
        deadline: 1,
        status: 1,
        createdAt: 1,
        employees: {
          $map: {
            input: '$employeesDetails',
            as: 'employee',
            in: { name: '$$employee.name' },
          },
        },
      },
    },
  ])

  const options = {
    page,
    limit,
  }

  const builds = await buildSchema.aggregatePaginate(aggregate, options)
  return builds
}