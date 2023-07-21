import * as jwt from "jsonwebtoken";
// import { privateKey } from "../config";

const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA1EJv4DF1FLkSbv4VAuSRIKvy54OdqD/VlR1hQr8Fcouie0Zb
sHswaeXcBe7K+o4paIdx8rjFVnsYcBOISyvkIP6Qh15XyuzEOQ67t+mSTD0O0fNS
/8cYt+9iIaxWQKW9UZf0ChqMG3gwpL7yvw8H5I8vBgUhSeINCKgF8XeLc+Xh2h9s
leZ8HwVD0sn+yK+f9cFYky04hVmJ6XoPbJKbj14KDGBuqwtHY35EQAK++ZYLD72B
njqpnPhxGR7vn+Jvigsx/r3XWXooPDA5hCFbRuPF523fYjCF6Ts9yRocIgMJvyGH
4tnJjxqDkmjZcjijyeImQY71WFKP4HJdk0aQBwIDAQABAoIBAGzJhDdegchWNmlm
lfQ+m1coab1YipQx61Calz+zUaJsiKEv5UxlRuHvqj3sLmIOPJDTYoZpRtLVEihX
CnKkky6J6h9HLi3V/ZfUwkc3UgD7Bj56vF5Vd4jGCwCBKE/H4mkQPUZ0ZrypdBzr
tNRRatUswYgPVwlb7xwxqaIhh/qkt5DTEcAgrZiKlCx0ZMgJSDniOW5zMwefqeLP
Pu8sga2KCT81OM4YSKXnpWzeLnlKs4HBZrOxxsqAC+IBVtiPX/hFYS45ZRS47lTY
tFUZFrJaTvXITJFP6MSHA+8ed2nx28q1hA8nyr1qmrnhw/m88Z3i+2ZoUDaO1OKn
L2bIiWECgYEA6zvaEA15kqoKqoK35uVrJdsXjtl+J8yIThzLy9Z7h5hTFdTYi6g2
5dhKJ6yG+ITytVx6znO2D8ZYXPFVxZPFYUe7rFPIXv6iScCRt5V5BV88yLyZcMw8
reQmX3KR9DI881MkmnCxpVYTOsibHWljyx2k6IlkvUXKe4r+UOSwX9ECgYEA5v9h
OqNu07nsCz1FiXP+EyS6VPsj9fymwT3UQmTluNV42cK8FiwL1luTBSqbP+THstzM
dK0j05Wu8giLHFwbhwCQhdibhqbn+RVxymRK+SW42+vjnnmQ9hlHvxS/TSoq/7Kb
W7l69zFvTVO4JsFPvbWGe1/sxPkLdr1NzeF2AFcCgYEAlbJPASwyE72WcBAjzBJv
b3XPth5+hAFLNLpqjtt9XTr4lMoQzD9OQFK2Ti0i74BbnEKv/DXyxHMqxGrodIWn
dFLcAbyHpLxStrCPis7aZyrGWdB7rSar7tVj/hXBADAATbC5eHcC9f6i2iPTYpIw
6Y+B5GGa9EA3rQs08HG4NCECgYEAsPQZa24fTBo09DcvuagdjlSoWMk6NwogRBA1
NddNE1aUiVxf8Sw0tTTZXy/QVhXP1PjHtumbdE5KAicBSexVOgn4rE/OdEwPkAQZ
c015EXsQLYh6ib/eiGe9Smd+VIJlBhOwZ4ei5xH7jWUAwM99YnpYVtKY8htF6OQD
Yh/A4WkCgYEAglfTX8CIuUcqBSKF1ELn7Fa2v+KtblSFMS2SKZwKqTerOPh5NMHc
L0Kyq3B8ga1KHaOMSoYZt+VEoM4i8GJh0O7160HHlP+o/KCLuUBMtTiUs41wgY8r
lxu+At149C8PG1etVfdM7aME0AQ8lphhGQSxlssSxIgWW7CFKPqirRs=
-----END RSA PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1EJv4DF1FLkSbv4VAuSR
IKvy54OdqD/VlR1hQr8Fcouie0ZbsHswaeXcBe7K+o4paIdx8rjFVnsYcBOISyvk
IP6Qh15XyuzEOQ67t+mSTD0O0fNS/8cYt+9iIaxWQKW9UZf0ChqMG3gwpL7yvw8H
5I8vBgUhSeINCKgF8XeLc+Xh2h9sleZ8HwVD0sn+yK+f9cFYky04hVmJ6XoPbJKb
j14KDGBuqwtHY35EQAK++ZYLD72BnjqpnPhxGR7vn+Jvigsx/r3XWXooPDA5hCFb
RuPF523fYjCF6Ts9yRocIgMJvyGH4tnJjxqDkmjZcjijyeImQY71WFKP4HJdk0aQ
BwIDAQAB
-----END PUBLIC KEY-----`;

export function signJWT(payload: object, expiresIn: string | number) {
    return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn });
}

export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return { payload: decoded, expired: false };
    } catch (error) {
        return { payload: null, expired: error.message.includes("JWT Expired") };
    }
}