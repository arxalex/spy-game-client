import {Injectable} from "@angular/core";
import {Game} from "../models/game";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserMapper {
  constructor() {
  }

  public getFromId(id: string): User {
    return {
      id: Number(id.slice(0, -6)),
      pass: id.slice(-6),
      name: undefined
    };
  }

  public toId(value: User): string {
    return value.id + value.pass;
  }
}
