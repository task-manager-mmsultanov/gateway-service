"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionsModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const permissions_model_1 = require("./../../permissions/models/permissions.model");
const roles_model_1 = require("./../../roles/models/roles.model");
let RolePermissionsModel = class RolePermissionsModel extends sequelize_typescript_1.Model {
};
exports.RolePermissionsModel = RolePermissionsModel;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => roles_model_1.RolesModel),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RolePermissionsModel.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => permissions_model_1.PermissionsModel),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RolePermissionsModel.prototype, "permission_id", void 0);
exports.RolePermissionsModel = RolePermissionsModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'role_permissions',
        timestamps: false
    })
], RolePermissionsModel);
//# sourceMappingURL=role-permissions.model.js.map