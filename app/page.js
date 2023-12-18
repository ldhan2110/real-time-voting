import Image from 'next/image'
import PieChart from './components/PieChart'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Image
              src="/logo-hackathon.png"
              alt="Company Hackathon"
              className="dark:invert"
              width={150}
              height={30}
              priority
        />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo-company.png"
              alt="Company Logo"
              className="dark:invert"
              width={200}
              height={250}
              priority
            />
          </a>
        </div>
      </div>

      <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
      </ul>

      {/* <div className="z-10 absolute top-[50%] left-[150px] criteria">
        <Image
              src="/mvp_icon.png"
              alt="Company Logo"
              className="dark:invert"
              width={50}
              height={50}
              priority
            />
      </div>

      <div className="z-10 absolute top-[50%] right-[150px] criteria">
        <Image
              src="/strategy_icon.png"
              alt="Company Logo"
              className="dark:invert"
              width={50}
              height={50}
              priority
            />
      </div>

      <div className="z-10 absolute top-[70%] right-[150px] criteria">
        <Image
              src="/teamwork_icon.png"
              alt="Company Logo"
              className="dark:invert"
              width={50}
              height={50}
              priority
            />
      </div>

      <div className="z-10 absolute top-[70%] left-[150px] criteria">
        <Image
              src="/creativity_icon.png"
              alt="Company Logo"
              className="dark:invert"
              width={50}
              height={50}
              priority
            />
      </div>

      <div className="z-10 absolute top-[20%] left-[47%] criteria">
        <Image
              src="/storytelling_icon.png"
              alt="Company Logo"
              className="dark:invert"
              width={50}
              height={50}
              priority
            />
      </div> */}

      <PieChart/>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        
      </div>
    </main>
  )
}
