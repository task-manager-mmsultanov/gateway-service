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
exports.UserModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const roles_model_1 = require("../../roles/models/roles.model");
let UserModel = class UserModel extends sequelize_typescript_1.Model {
};
exports.UserModel = UserModel;
__decorate([
    (0, sequelize_typescript_1.Column)({
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserModel.prototype, "first_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserModel.prototype, "last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        unique: true,
        validate: {
            isEmail: true
        }
    }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => roles_model_1.RolesModel),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserModel.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => roles_model_1.RolesModel),
    __metadata("design:type", roles_model_1.RolesModel)
], UserModel.prototype, "role", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], UserModel.prototype, "deleted_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: true }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "is_deleted", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: 'TIMESTAMP',
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], UserModel.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: 'TIMESTAMP',
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], UserModel.prototype, "updated_at", void 0);
exports.UserModel = UserModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'users',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ],
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        }
    })
], UserModel);
//# sourceMappingURL=user.model.js.map