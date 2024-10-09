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
exports.RolesModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const role_permissions_model_1 = require("./../../permissions/models/role-permissions.model");
const permissions_model_1 = require("./../../permissions/models/permissions.model");
const user_model_1 = require("./../../users/models/user.model");
let RolesModel = class RolesModel extends sequelize_typescript_1.Model {
};
exports.RolesModel = RolesModel;
__decorate([
    (0, sequelize_typescript_1.Column)({
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], RolesModel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], RolesModel.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], RolesModel.prototype, "slug", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_model_1.UserModel, { foreignKey: 'id' }),
    __metadata("design:type", Array)
], RolesModel.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => permissions_model_1.PermissionsModel, () => role_permissions_model_1.RolePermissionsModel),
    __metadata("design:type", Array)
], RolesModel.prototype, "permissions", void 0);
exports.RolesModel = RolesModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'roles',
        timestamps: false,
        paranoid: false,
        indexes: [
            {
                unique: true,
                fields: ['slug']
            }
        ],
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    })
], RolesModel);
//# sourceMappingURL=roles.model.js.map