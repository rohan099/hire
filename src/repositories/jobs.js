const knex = requireKnex();
const baseRepo = requireUtil("baseRepo");

const create = async (payload) => {
  try {
    payload = baseRepo.addCreatedTimestamps(payload);
    let result = await knex.transaction(async (trx) => {
      const rows = await trx("jobs").insert(payload).returning("*");
      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllJobs = async (query) => {
  try {
    if (query && query.tags && query.tags.length > 0) {
      var arr = query.tags.split(",");
      return await getJobsByTags(arr);
    } else {
      const rows = knex("jobs").orderBy("created_at", "desc");
      return rows;
    }
  } catch (error) {
    throw error;
  }
};

const findByUuid = async (where = {}) => {
  return await baseRepo.first("jobs", where);
};

const getAllPostedJobs = async (user_uuid) => {
  try {
    const rows = knex("jobs").where("user_uuid", user_uuid);
    return rows;
  } catch (error) {
    throw error;
  }
};

const remove = async (id, user) => {
  const query = await knex("jobs").where({ uuid: id });
  if (query.length === 0) {
    return { message: "doesn't exist" };
  } else {
    if (query[0].user_uuid !== user) {
      return { message: "Not authorized" };
    } else {
      const where = { uuid: id };
      //   await knex('jobs_tags').where({ query_uuid: where.uuid }).delete();
      await baseRepo.remove("jobs", where, "hard");
      //   await baseRepo.remove("jobs", where, "soft");
      return { message: "success" };
    }
  }
};

const update = async (id, payload) => {
  try {
    payload["updated_at"] = new Date().toISOString();
    let result = await knex.transaction(async () => {
      let rows = await knex("jobs")
        .where({ uuid: id })
        .update(payload)
        .returning("*");

      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getAllJobs,
  findByUuid,
  getAllPostedJobs,
  remove,
  update,
};
