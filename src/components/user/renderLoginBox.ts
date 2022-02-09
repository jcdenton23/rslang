import { IUser } from '../interfaces';
import createUser from './createUser';
import { signIn } from './signIn';

export default () => {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = 'login-modal';
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', 'login-modal-label');
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = ` <div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="login-modal-label">Login</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <nav>
        <div class="nav nav-tabs d-flex justify-content-center" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-signin-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-signin"
            type="button"
            role="tab"
            aria-controls="nav-signin"
            aria-selected="true"
          >
            Sign in
          </button>
          <button
            class="nav-link"
            id="nav-registration-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-registration"
            type="button"
            role="tab"
            aria-controls="nav-registration"
            aria-selected="false"
          >
            Registration
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-signin" role="tabpanel" aria-labelledby="nav-signin-tab">
          <form id="form-signin">
            <div class="mb-3">
              <label for="exampleInputEmailSignIn" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmailSignIn"
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPasswordSignIn" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPasswordSignIn"
                maxlength="20"
                minlength="8"
                required
              />
            </div>
            <div class="mb-3 form-check"></div>
            <button type="submit" class="btn btn-primary">Sign in</button>
          </form>
        </div>
        <div class="tab-pane fade" id="nav-registration" role="tabpanel" aria-labelledby="nav-registration-tab">
          <form id="form-registration">
            <label for="exampleInputNameReg" class="form-label">First name</label>
            <input type="text" class="form-control" id="exampleInputNameReg" required />
            <div class="mb-3">
              <label for="exampleInputEmailReg" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmailReg"
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPasswordReg" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPasswordReg"
                maxlength="20"
                minlength="8"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary" desible>>Registration</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>`;

  const formSignIn = modal.querySelector('#form-signin') as HTMLFormElement;
  formSignIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const user: IUser = {
      email: (formSignIn.querySelector('#exampleInputEmailSignIn') as HTMLFormElement).value,
      password: (formSignIn.querySelector('#exampleInputPasswordSignIn') as HTMLFormElement).value,
    };

    console.log(user);
    signIn(user);
  });

  const formRegistration = modal.querySelector('#form-registration') as HTMLFormElement;
  formRegistration.addEventListener('submit', (e) => {
    e.preventDefault();
    const user: IUser = {
      name: (formRegistration.querySelector('#exampleInputNameReg') as HTMLFormElement).value,
      email: (formRegistration.querySelector('#exampleInputEmailReg') as HTMLFormElement).value,
      password: (formRegistration.querySelector('#exampleInputPasswordReg') as HTMLFormElement).value,
    };

    console.log(user);

    createUser(user);
  });

  document.body.append(modal);
};
