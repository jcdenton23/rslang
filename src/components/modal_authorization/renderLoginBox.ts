import renderLoginModal from './renderLoginModal';

export default function renderLoginBox() {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = 'login-modal';
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', 'login-modal-label');
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
  <div class="modal-dialog">
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
                <label for="emailSignIn" class="form-label ">Email address</label>
                <input
                  type="email"
                  class="form-control form-signin__email"
                  id="emailSignIn"
                  aria-describedby="emailHelp"
                  required
                />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                <div class="valid-feedback">Looks good!</div>
              </div>
              <div class="mb-3">
                <label for="passwordSignIn" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control form-signin__password"
                  id="passwordSignIn"
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
              <label for="nameReg" class="form-label">First name</label>
              <input
                type="text"
                class="form-control form-registration__name"
                id="nameReg"
                maxlength="30"
                minlength="2"
                required
              />
              <div class="mb-3">
                <label for="emailReg" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control form-registration__email"
                  id="emailReg"
                  aria-describedby="emailHelp"
                  required
                />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                <div class="valid-feedback">Looks good!</div>
              </div>
              <div class="mb-3">
                <label for="passwordReg" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control form-registration__password"
                  id="passwordReg"
                  maxlength="20"
                  minlength="8"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary" desible>Registration</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  renderLoginModal(modal);
  document.body.append(modal);
}
