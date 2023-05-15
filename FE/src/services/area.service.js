import BaseService from "@/services/base.service.js";
import http from "@/services/services.js";
class packingReserveExtend extends BaseService {
  list(filter = null) {
    return http.get(
      `/api/collections/${this.name}/records?expand=user_id,packing_Area_id`,
      { params: filter }
    );
  }
}
const parkingReserve = new packingReserveExtend("parking_reserve");
export default parkingReserve;
