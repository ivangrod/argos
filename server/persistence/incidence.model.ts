import {DataTypes, Model, Optional, Sequelize,} from 'sequelize';

interface IncidenceAttributes {
    id: number;
    external_id?: string;
    type?: string;
    description?: string;
    requested_date: Date;
    address?: string;
    latitude?: number;
    longitude?: number;
}

interface IncidenceCreationAttributes extends Optional<IncidenceAttributes, 'id'> {}

class IncidenceModel
    extends Model<IncidenceAttributes, IncidenceCreationAttributes>
    implements IncidenceAttributes
{
    public id!: number;
    public external_id?: string;
    public type?: string;
    public description?: string;
    public requested_date!: Date;
    public address?: string;
    public latitude?: number;
    public longitude?: number;
}

export function initIncidenceModel(sequelize: Sequelize): typeof IncidenceModel {
    IncidenceModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            external_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            requested_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            latitude: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            longitude: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Incidence',
            tableName: 'incidence',
            timestamps: false,
        }
    );

    return IncidenceModel;
}

export async function getLast25Incidences(): Promise<IncidenceModel[]> {
    try {
        return await IncidenceModel.findAll({
            limit: 30,
            order: [['requested_date', 'DESC']],
        });
    } catch (error) {
        console.error('Error fetching incidences:', error);
        throw error;
    }
}