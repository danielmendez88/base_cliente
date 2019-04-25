export interface Comisiones {


        id?: number,
        motivo_comision?: string,
        no_comision?:string,
        no_memorandum?: string,
        nombre_comisionado?: string,
        rfc?: string,        
        categoria?: string,    
        telefono?: string,        
        user_id?: 1,
        es_vehiculo_oficial?: boolean,
        fecha?: Date,
        total?: number,
        tipo_comision?: string,
        placas?: string,
        modelo?: string,
        status_comision?: 0,
        total_peaje?: number,
        total_combustible?: number,
        total_fletes_mudanza?: number,
        total_pasajes_nacionales?: number,
        total_viaticos_nacionales?: number,
        total_viaticos_extranjeros?: number,
        total_pasajes_internacionales?: number,
        nombre_subdepartamento?: string,
        organo_responsable_id?: 1,
        plantilla_personal_id?: 1,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        lugares_comision?:[ {

            sede: string,
            es_nacional,
            periodo,
            termino,    
            fecha_inicio: Date,
            fecha_termino: Date,
            cuota_diaria: number,
            total_dias: number,  
            importe: number,

        } ];
}