import jwt from "jsonwebtoken";
//token genration
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
//ppppppppppppppppppppppppppppp llllllllllllllllllllllllllllll sssssssssssssssssssssssssssss
export default generateToken;
