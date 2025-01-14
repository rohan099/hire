const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

describe("Test API Jobs/CanPostJob", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
  });

  it("dummy_story_which_will_pass", async () => {
    let respondResult;
    try {
      const app = await httpServer();

      const payload = {
        user_uuid: contextClassRef.user.user_uuid,
        company_name: "Pogo pvt ltd",
        title: "Software Engineer",
        experience: "1 year",
        location: {
          country: "India",
          city: "Hyderabad",
        },
        description: "",
        requirements_attachments: [],
        top_skills: ["React JS", "Node JS"],
        employment_type: "private",
        salary_offer_band: {
          currency: "INR",
          range: {
            from: "500000",
            to: "600000",
          },
        },
        about_company: "Open Source IT Projects Private Ltd",
        company_size: "10-15",
        industry: "IT - Information Technology",
        specialization_area: "SAP, Web Development",
        notice_period_acceptance: "1 Week",
        note_for_applicants: "",
        applicants: [],
      };

      respondResult = await app.inject({
        method: "POST",
        url: "/jobs",
        payload,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      user_uuid: contextClassRef.user.user_uuid,
      company_name: "Pogo pvt ltd",
      title: "Software Engineer",
      experience: "1 year",
      location: {
        country: "India",
        city: "Hyderabad",
      },
      description: null,
      requirements_attachments: [],
      top_skills: ["React JS", "Node JS"],
      employment_type: "private",
      salary_offer_band: {
        currency: "INR",
        range: {
          from: "500000",
          to: "600000",
        },
      },
      about_company: "Open Source IT Projects Private Ltd",
      company_size: "10-15",
      industry: "IT - Information Technology",
      specialization_area: "SAP, Web Development",
      notice_period_acceptance: "1 Week",
      note_for_applicants: null,
      applicants: [],
    });
  });
});
