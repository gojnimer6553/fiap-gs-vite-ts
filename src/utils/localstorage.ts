interface IVehicle {
  color: string;
  brand: string;
  plate: string;
}

class LocalStorageVehicles {
  static saveVehicles(vehicles: IVehicle[]) {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
  }

  static getVehicles(): IVehicle[] {
    const vehicles = localStorage.getItem("vehicles");
    if (vehicles) {
      return JSON.parse(vehicles);
    }
    return [];
  }
}

export { LocalStorageVehicles };

export type { IVehicle };
