
const express = require("express");
const router = express.Router();
const { Site } = require("../models/Site");
const { User } = require("../models/User");

const async = require("async");

// 전문가 권한 유저 목록 가져오기
router.get("/getAllSites", (req, res) => {
  Site.find()
    .populate({
      path: "engines.engine",
      populate: {
        path: "requiredParts.part",
        model: "Part",
      },
    })
    .populate({
      path: "engines.repairHistory",
      populate: {
        path: "part",
        model: "Part",
      },
    })
    .populate("partStock.part")
    .exec((err, sites) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
        sites: sites,
      });
    });
});

// 본사 정보 가져오기
router.post("/headParts", (req, res) => {
  Site.find()
    .where("name")
    .equals("본사")
    .populate({
      path: "engines",
      populate: {
        path: "requiredParts.part",
        model: "Part",
      },
    })
    .populate("partStock.part")
    .exec((err, sites) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
        sites: sites,
      });
    });
});

// 사이트 부품 추가
router.post("/addSitePart", (req, res) => {
  Site.findOne(
    { id: req.body.site },
    { partStock: { $elemMatch: { part: req.body.id } } },
    (err, part) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      if (part.partStock.length) {
        return res.json({
          success: false,
          message: "부품이 이미 존재합니다.",
        });
      } else {
        Site.findOneAndUpdate(
          { id: req.body.site },
          {
            $push: { partStock: { part: req.body.id, stock: req.body.stock } },
          },
          { new: true, omitUndefined: true },
          (err, site) => {
            if (err) {
              return res.status(400).json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
              message: "부품을 재고에 추가했습니다.",
            });
          }
        );
      }
    }
  );
});

// 사이트 재고 수정
router.post("/updateSitePart", (req, res) => {
  Site.findOneAndUpdate(
    {
      id: req.body.site,
      partStock: { $elemMatch: { part: req.body.id } },
    },
    { $set: { "partStock.$.stock": req.body.stock } }
  ) // $ 찾은 자리?
    .exec()
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
});

// 사이트 재고 삭제
router.post("/deleteSitePart", async (req, res) => {
  const parts = req.body.parts;

  const promises = parts.map(async (part) => {
    await Site.findOneAndUpdate(
      {
        id: req.body.id,
      },
      { $pull: { partStock: { part: part } } },
      { new: true, omitUndefined: true }
    );
  });

  await Promise.all(promises)
    .then((re) => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// 사용자/사이트 관리 페이지
// 사이트 추가
router.post("/addSite", (req, res) => {
  Site.findOne({ id: req.body.id }, (err, part) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (part) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
      Site.findOne({ name: req.body.name }, (err, part) => {
        if (part) {
          return res.json({
            success: false,
            message: "사이트가 이미 존재합니다.",
          });
        } else {
          const site = new Site(req.body);
          site.save((err, siteInfo) => {
            if (err) {
              console.log("err2: ", err);
              return res.status(400).json({ success: false, err });
            }
            return res.status(200).json({
              success: true,
              message: "사이트를 추가했습니다.",
            });
          });
        }
      });
    }
  });
});

// 사이트 변경
router.post("/updateSite", (req, res) => {
  Site.findOne({ id: req.body.id, _id: { $ne: req.body._id } }, (err, part) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (part) {
      return res.json({
        success: false,
        message: "아이디가 이미 존재합니다.",
      });
    } else {
      Site.findOneAndUpdate(
        { _id: req.body._id },
        {
          id: req.body.id,
          name: req.body.name,
          desc: req.body.desc,
        },
        (err, doc) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).send({
            success: true,
          });
        }
      );
    }
  });
});

// 사이트 삭제
router.post("/deleteSite", async (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기
  console.log("id: ", req.body._id);

  let reqid = req.body._id;

  let { ok, fail, err } = await findQ(reqid);

  if (err) return res.status(400).json(err);
  else if (fail.length == reqid.length)
    return res.status(200).json({ success: false, fail });
  return res.status(200).json({ success: true, ok, fail });
});

async function findQ(reqid) {
  let fail = [];
  let ok = [];

  const findPromise = reqid.map(async (id) => {
    const existUser = await User.find({
      site: id,
    });

    if (existUser.length === 0) {
      ok.push(id);
      await Site.deleteOne({ _id: id });
    } else {
      fail.push(id);
    }
  });

  await Promise.all(findPromise)
    .then()
    .catch((err) => {
      console.log(err);
      return { undefined, undefined, err };
    });

  return { ok, fail, undefined };
}

// 사이트별 엔진 추가
router.post("/addSiteEngine", async (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기

  Site.findOneAndUpdate(
    { _id: req.body.site },
    {
      $push: { engines: { id: req.body.id, engine: req.body.engineId } },
    },
    (err, site) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        message: "엔진을 사이트에 추가했습니다.",
      });
    }
  );
});

// 사이트별 엔진 정비/교체 이력 추가
router.post("/addSiteEngineMaintenance", async (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기
  console.log("id: ", req.body.id);

  Site.findOneAndUpdate(
    { engines: { $elemMatch: { id: req.body.id } } },
    {
      $push: {
        "engines.$.repairHistory": {
          status: req.body.status,
          part: req.body.part,
          date: req.body.date,
        },
      },
    },
    (err, site) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        message: "정비 이력을 추가했습니다.",
      });
    }
  );
});

// 사이트별 엔진 정비/교체 이력 삭제
router.post("/deleteSiteEngineMaintenance", async (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기
  Site.findOneAndUpdate(
    { _id: req.body.site, "engines.repairHistory._id": req.body.id },
    {
      $pull: {
        "engines.$.repairHistory": {
          _id: req.body.id,
        },
      },
    },
    (err, site) => {
      console.log("err: ", err);
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        message: "정비 이력을 추가했습니다.",
      });
    }
  );
});

// 사이트별 엔진 삭제
router.post("/deleteSiteEngines", async (req, res) => {
  // Object ID로 Site, Engine에서 쓰였는지 찾기
  console.log("site: ", req.body.site);
  console.log("engines: ", req.body.engines);
  const engines = req.body.engines;

  const pullArrayPromises = engines.map(async (engine) => {
    await Site.findOneAndUpdate(
      { _id: req.body.site },
      { $pull: { engines: { id: engine } } }
    );
  });

  await Promise.all(pullArrayPromises)
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
});

module.exports = router;
