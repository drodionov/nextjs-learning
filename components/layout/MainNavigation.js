import classes from './MainNavigation.module.css'
import Link from "next/link"
import {useRouter} from "next/router";

const MainNavigation = () => {
  const router = useRouter()
  const onClickHandler = async () => {
    await router.push('/')
  }

  return (
      <header className={classes.header}>
        <div className={classes.logo} onClick={onClickHandler}>React Meetups
        </div>
        <nav>
          <ul>
            <li>
              <Link href='/'>All Meetups</Link>
            </li>
            <li>
              <Link href='/new-meetup'>Add New Meetup</Link>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default MainNavigation
