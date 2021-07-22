import { Connection, createConnection, getConnectionOptions } from "typeorm";

// recebe o host
export default async (host = 'database'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      // faz a condição
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_test"
          : defaultOptions.database,
    })
  );
};
