/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/products": {
    get: {
      responses: {
        /** @description List of Products */
        200: {
          content: {
            "application/json": components["schemas"]["Products"][];
          };
        };
      };
    };
  };
  "/product/{id}": {
    get: {
      responses: {
        /** @description Get Product by id */
        200: {
          content: {
            "application/json": components["schemas"]["Products"];
          };
        };
      };
    };
  };
  "/customer/{id}": {
    get: {
      responses: {
        /** @description update user */
        200: {
          content: {
            "application/json": components["schemas"]["Customers"];
          };
        };
      };
    };
    patch: {
      parameters: {
        path: {
          id: string;
        };
      };
      /** @description More Updates */
      requestBody: {
        content: {
          "application/json": components["schemas"]["Customers"];
        };
      };
      responses: {
        /** @description Updated user */
        200: {
          content: never;
        };
      };
    };
  };
  "/update-cart/{id}": {
    delete: {
      parameters: {
        path: {
          /** @description customerId */
          id: string;
        };
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description Cart id */
            id?: string;
          };
        };
      };
      responses: {
        /** @description Updated user */
        200: {
          content: never;
        };
      };
    };
    patch: {
      parameters: {
        path: {
          id: string;
        };
      };
      /** @description More Updates */
      requestBody: {
        content: {
          "application/json": components["schemas"]["Carts"];
        };
      };
      responses: {
        /** @description Updated user */
        200: {
          content: never;
        };
      };
    };
  };
  "/get-cart/{id}": {
    get: {
      responses: {
        /** @description Customer Cart */
        200: {
          content: {
            "application/json": components["schemas"]["Carts"];
          };
        };
      };
    };
  };
  "/get-orders/{id}": {
    get: {
      responses: {
        /** @description Customer Orders */
        200: {
          content: {
            "application/json": components["schemas"]["Orders"][];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Products: {
      id: string;
      created_at: string;
      productName: string;
      description: string;
      productImages: string[];
      category: string;
      price: number;
      discount: number;
    };
    Customers: {
      id: string;
      created_at?: string;
      displayName?: string;
      cart?: string[];
      orders?: string[];
      email?: string;
    };
    Carts: {
      id: string;
      customerId: string;
      products: components["schemas"]["Products"][];
      created_at?: string;
      total: number;
    };
    Orders: {
      id: string;
      userId: string;
      products: string[];
      total: Record<string, never>;
      created_at?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
