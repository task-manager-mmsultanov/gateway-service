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
exports.PermissionsModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const role_permissions_model_1 = require("./role-permissions.model");
const roles_model_1 = require("../../roles/models/roles.model");
let PermissionsModel = class PermissionsModel extends sequelize_typescript_1.Model {
};
exports.PermissionsModel = PermissionsModel;
__decorate([
    (0, sequelize_typescript_1.Column)({
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], PermissionsModel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], PermissionsModel.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => roles_model_1.RolesModel, () => role_permissions_model_1.RolePermissionsModel),
    __metadata("design:type", Array)
], PermissionsModel.prototype, "roles", void 0);
exports.PermissionsModel = PermissionsModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'permissions',
        timestamps: false,
        paranoid: false,
        indexes: [
            {
                unique: true,
                fields: ['name']
            }
        ]
    })
], PermissionsModel);
//# sourceMappingURL=permissions.model.js.map