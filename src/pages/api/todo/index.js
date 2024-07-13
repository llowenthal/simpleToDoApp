import { prisma } from "@/server/prisma";

export default async function handler(req, res) {
  console.log("testing!@!@@!");
  if (req.method === "GET") {
    const todoItems = await prisma.toDo.findMany();
    console.log(todoItems);
    res.status(200).json({ todo: todoItems });
  } else if (req.method === "POST") {
    const todoId = req.body.id;
    const completed = req.body.completed;
    console.log(req.body);
    const validItemId = await prisma.toDo.findFirst({
      where: { id: todoId },
    });
    if (validItemId) {
      await prisma.toDo.update({
        where: { id: todoId },
        data: { completed: completed },
      });
    }
  } else {
    res.status(404).json({ message: "We only support GET requests" });
  }
}
//   } else if (req.method === "POST") {
//     const menuId = req.body.id;
//     const itemInCartAlready = await prisma.cart.findFirst({
//       where: { menuItemId: menuId },
//     });
//     if (itemInCartAlready) {
//       await prisma.cart.update({
//         where: { menuItemId: menuId },
//         data: { quantity: itemInCartAlready.quantity + 1 },
//       });
//     } else {
//       await prisma.cart.create({
//         data: { menuItemId: menuId, quantity: req.body.quantity },
//       });
//     }
//     res.status(200).json({ message: "Item added to cart" });
//   } else {
//     res.status(404).json({ message: "We only support GET requests" });
//   }
// }
