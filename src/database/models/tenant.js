import { DataTypes } from "sequelize";

const Tenant = (sequelize) => {
    return sequelize.define("Tenant", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        guid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        database: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: "Tenants",
        timestamps: true,
        paranoid: true,
    });
};

export default Tenant;