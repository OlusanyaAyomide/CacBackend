class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filtering() {
    let queryObject = { ...this.queryStr };
    const excludedFields = ["page", "fields", "count", "sort", "limit"];
    excludedFields.forEach((item) => delete queryObject[item]);
    queryObject = JSON.stringify(queryObject);
    queryObject = JSON.parse(queryObject.replace(/(gt|gte|lt|lte)/g, "$$$1"));
    this.query = this.query.find(queryObject);

    return this;
  }

  sorting() {
    if (this.queryStr.sort) {
      const sortedBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortedBy);
    } else {
      this.query = this.query.sort("-price");
    }
    return this;
  }

  limiting() {
    if (this.queryStr.fields) {
      const Fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(Fields);
    } else {
      this.query = this.query.select("-__v ");
    }
    return this;
  }

  paginating() {
    const page = this.queryStr.page || 1;
    const limit = this.queryStr.limit || 5;
    const skipBy = (page - 1) * limit;
    this.query = this.query.skip(skipBy).limit(limit);
    return this;
  }
}

export default ApiFeatures;