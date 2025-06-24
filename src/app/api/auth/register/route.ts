import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { UserType } from "@prisma/client"

export async function POST(request: Request) {
  try {
    const { email, password, userType, name, companyName } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user based on type
    if (userType === UserType.JOB_SEEKER) {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          userType: UserType.JOB_SEEKER,
          jobSeeker: {
            create: {
              name
            }
          }
        }
      })
      return NextResponse.json({ message: "Job seeker created successfully", userId: user.id })
    } else if (userType === UserType.COMPANY) {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          userType: UserType.COMPANY,
          company: {
            create: {
              companyName
            }
          }
        }
      })
      return NextResponse.json({ message: "Company created successfully", userId: user.id })
    }

    return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}