import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Connected to PostgreSQL database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Disconnected from PostgreSQL database');
  }

  /**
   * Método helper para limpiar la base de datos (útil en testing)
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production!');
    }

    const models = Reflect.ownKeys(this).filter(
      (key) => key !== '_engine' && key !== '_fetcher' && typeof key === 'string'
    );

    return Promise.all(
      models.map((modelKey) => {
        const model = this[modelKey as keyof PrismaService];
        if (model && typeof model === 'object' && 'deleteMany' in model) {
          return (model as any).deleteMany();
        }
      })
    );
  }

  /**
   * Método helper para ejecutar queries con RLS (Row Level Security)
   * 
   * Este método está preparado para activar RLS en PostgreSQL usando app.tenant_id.
   * 
   * Cuando se active RLS en producción, este método:
   * 1. Iniciará una transacción
   * 2. Ejecutará: SELECT set_config('app.tenant_id', $tenantId, true)
   * 3. Ejecutará el callback con las queries dentro de la transacción
   * 4. Las políticas RLS en PostgreSQL filtrarán automáticamente por app.tenant_id
   * 
   * Ejemplo de uso:
   * ```
   * await prisma.withTenant(tenantId, async (tx) => {
   *   // Todas las queries aquí respetan RLS automáticamente
   *   const products = await tx.product.findMany();
   *   return products;
   * });
   * ```
   * 
   * TODO: Implementar cuando se activen las políticas RLS en PostgreSQL
   * Pasos pendientes:
   * 1. Crear políticas RLS en cada tabla con: WHERE tenant_id = current_setting('app.tenant_id')::integer
   * 2. Habilitar RLS: ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;
   * 3. Descomentar el código de set_config abajo
   * 
   * @param tenantId - El ID del tenant para filtrar datos
   * @param callback - Función que ejecuta queries dentro del contexto del tenant
   */
  async withTenant<T>(tenantId: number, callback: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    // Por ahora solo ejecutamos el callback sin RLS
    // Más adelante, cuando activemos RLS:
    
    /*
    return this.$transaction(async (tx) => {
      // Configurar app.tenant_id para RLS
      await tx.$executeRawUnsafe(
        `SELECT set_config('app.tenant_id', $1, true)`,
        tenantId.toString()
      );
      
      // Ejecutar queries del callback
      return callback(tx as PrismaClient);
    });
    */
    
    // Versión actual sin RLS (manual filtering)
    return callback(this);
  }
}
