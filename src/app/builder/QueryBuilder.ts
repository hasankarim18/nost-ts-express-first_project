import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  // defining the method -- function inside class called method

  /** search method */
  /** search query starts */
  search(searchableFields: string[]) {
    const searchTerms = this.query.searchTerms
    if (this?.query?.searchTerms) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: { $regex: searchTerms, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }
    return this
  }
  /** search query ends */

  /**
   * Filter
   */
  filter() {
    const queryObj = { ...this.query } // copy of query
    // excludes fields
    const excludeFields = ['searchTerms', 'sort', 'limit', 'page', 'fields']
    excludeFields.forEach(el => delete queryObj[el])

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  /**
   *
   * sort
   */
  sort() {
    const sort = this?.query.sort || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)
    return this
  }

  /**
   *
   * paginate
   *  */

  paginate() {
    const page = Number(this.query?.page || 1)
    const limit = Number(this.query?.limit || 10)
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'

    this.modelQuery = this.modelQuery.select(fields)
    return this
  }
}

export default QueryBuilder