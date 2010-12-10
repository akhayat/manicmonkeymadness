package manicmonkeymadness;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManagerFactory;

public final class M3PersistenceManagerFactory {
    private static final PersistenceManagerFactory pmfInstance =
        JDOHelper.getPersistenceManagerFactory("transactions-optional");

    private M3PersistenceManagerFactory() {}

    public static PersistenceManagerFactory get() {
        return pmfInstance;
    }
}