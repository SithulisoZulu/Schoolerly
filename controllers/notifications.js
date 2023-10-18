import { deleteNotifications, getNotificationById } from "../data/database/notification.js";
import { checkCurrentUser } from "../libraries/Api/user/userApi.js";
import { user } from "../utils/Session.js";

import userRoles from "../libraries/roles.js";

const email = user()

export const DeleteNotifications = async (id) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id ){
        throw new Error("You need an account to remove notification")
    }
    const notification = await deleteNotifications(id)
    return notification
}

export const GetNotificationById = async (id) => {
    const user = await checkCurrentUser(email)
    if (!user || !user.id) {
        throw new Error("You need an account get notification")
    }
    const notification = await getNotificationById(id)

    return notification
}