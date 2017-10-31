// import "automapper-ts";
// import * as jwt from "jwt-simple";
// import * as config from "config";
// export class MapperRegistry {
//   public init(): void {
//     automapper
//       .createMap("IUser", "UserModel")
//       .forMember("role", (opts) => { return userTypes[opts.sourceObject.userType]; })
//       .forMember("firstName", (opts) => { return opts.mapFrom("name"); })
//       .forMember("name", (opts) => { opts.ignore(); });
//     automapper
//       .createMap("IUser", "UserLoginModel")
//       .forMember("role", (opts) => { return userTypes[opts.sourceObject.userType]; })
//       .forMember("token", (opts) => {
//         let secret: string = String(config.get("secret"));
//         return jwt.encode({ authUserId: opts.sourceObject.id }, secret);
//       });
//     automapper
//       .createMap("SearchPayload", "SearchParams")
//       .forMember("value", (opts) => { return opts.sourceObject.search.value; })
//       .forMember("regex", (opts) => { return opts.sourceObject.search.regex; })
//       .forMember("orderColumn", (opts) => { return opts.sourceObject.order[0].column; })
//       .forMember("orderDirection", (opts) => { return opts.sourceObject.order[0].dir; })
//       .forMember("start", (opts) => { return parseInt(opts.sourceObject.start, 10); })
//       .forMember("length", (opts) => { return parseInt(opts.sourceObject.length, 10); })
//       .forMember("restaurantId", (opts) => { return null; })
//       .forMember("search", (opts) => { opts.ignore(); })
//       .forMember("order", (opts) => { opts.ignore(); })
//       .forMember("columns", (opts) => { opts.ignore(); });
//     automapper
//       .createMap("IOrder", "OrderSearchModel")
//       .forMember("address", (opts) => {
//         if (opts.sourceObject.deliveryType === "DELIVERY") {
//           return opts.sourceObject.deliveryAddress.street + " " +
//             opts.sourceObject.deliveryAddress.streetNumber;
//         }
//         return "N/A";
//       })
//       .forMember("deliveryAddress", (opts) => { opts.ignore(); });
//   }
// }
// const userTypes = {
//   1: "Administrator",
//   2: "Operator",
//   3: "Regular",
// };
//# sourceMappingURL=Register.js.map